import React, { useCallback, useRef, useState } from "react";
import Router from "next/router";

import MainLayout from "components/MainLayout";
import BreadcrumbsModule from "shared/BreadcrumbsModule";
import Button from "shared/Button";

import { createUUID } from "lib";
import { setLocalForageItem } from "lib/localForage";

import { LISTS_TITLE } from "constants/lists";
import { DPLA_ITEM_ID_REGEX } from "constants/items";
import { MAX_LIST_ITEMS } from "constants/site";

import utils from "stylesheets/utils.module.css";
import css from "components/ListComponents/ListComponents.module.css";

const PAGE_TITLE = "Import a list";
const NAME_CHAR_LIMIT = 64;

export default function ImportList() {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [listName, setListName] = useState("");
  const [error, setError] = useState("");
  const [isImporting, setIsImporting] = useState(false);

  const handleFileChange = useCallback((e) => {
    const file = e.target.files?.[0];
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (!file) return;
    setError("");
    setSelectedFile(file);
    setListName(
      file.name.replace(/\.csv$/i, "").replace(/^DPLA User List - /i, "")
    );
  }, []);

  const handleImport = useCallback(async () => {
    if (isImporting || !selectedFile) return;
    setError("");

    const MAX_FILE_BYTES = 5 * 1024 * 1024; // 5 MB
    if (selectedFile.size > MAX_FILE_BYTES) {
      setError("File is too large. Please make sure you are importing a valid DPLA list CSV.");
      return;
    }

    setIsImporting(true);
    try {
      let text;
      try {
        text = await selectedFile.text();
      } catch {
        setError("Could not read the file. Please try again.");
        return;
      }

      const lines = text.split(/\r?\n/);
      const seen = new Set();
      const ids = [];
      for (let i = 0; i < lines.length; i++) {
        const id = lines[i].split(",")[0].trim().toLowerCase();
        if (DPLA_ITEM_ID_REGEX.test(id) && !seen.has(id)) {
          seen.add(id);
          ids.push(id);
          if (ids.length >= MAX_LIST_ITEMS) break;
        }
      }

      if (ids.length === 0) {
        setError(
          "No valid DPLA item IDs were found in this file. Make sure you are importing a CSV that was previously downloaded from a DPLA list."
        );
        return;
      }

      const name = listName.trim() || "Imported list";
      const uuid = createUUID();
      const createdAt = Date.now();
      const selectedHash = Object.fromEntries(ids.map((id) => [id, id]));
      try {
        await setLocalForageItem(uuid, {
          uuid,
          name,
          selectedHash,
          count: ids.length,
          createdAt,
        });
      } catch {
        setError("Could not save the list. Your browser storage may be full or unavailable.");
        return;
      }
      await Router.push({ pathname: `/lists/${uuid}` });
    } finally {
      setIsImporting(false);
    }
  }, [isImporting, selectedFile, listName]);

  return (
    <MainLayout pageTitle={PAGE_TITLE}>
      <BreadcrumbsModule
        breadcrumbs={[{ title: LISTS_TITLE, url: "/lists" }, { title: PAGE_TITLE }]}
      />
      <div id="main" role="main" className={`${utils.container} ${css.listDetailWrapper}`}>
        <h1 className={css.contentTitle}>{PAGE_TITLE}</h1>
        <p>
          Import a CSV file to restore or share a list. The imported list will
          be saved in this browser alongside your other lists.
        </p>
        <p>You can import previously exported DPLA lists, or provide your own CSV where the first column contains DPLA item IDs (the header row, if present, is skipped automatically).</p>
        <div className={css.importPageActions}>
          <Button
            type={selectedFile ? "secondary" : "primary"}
            onClick={() => fileInputRef.current?.click()}
            disabled={isImporting}
            title={selectedFile?.name}
          >
            {selectedFile
              ? selectedFile.name.length > 30
                ? selectedFile.name.slice(0, 28) + "…"
                : selectedFile.name
              : "Choose CSV file"}
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv"
            className={css.importInput}
            onChange={handleFileChange}
          />
        </div>
        {selectedFile && (
          <div className={css.importNameField}>
            <label htmlFor="import-list-name" className={css.importNameLabel}>
              List name
            </label>
            <input
              id="import-list-name"
              type="text"
              value={listName}
              onChange={(e) => setListName(e.target.value)}
              maxLength={NAME_CHAR_LIMIT}
              placeholder="Imported list"
              className={css.importNameInput}
              disabled={isImporting}
            />
            <div className={css.importPageActions}>
              <Button
                type="primary"
                onClick={handleImport}
                disabled={isImporting}
              >
                {isImporting ? "Importing…" : "Import list"}
              </Button>
            </div>
          </div>
        )}
        {error && <p className={css.importError}>{error}</p>}
      </div>
    </MainLayout>
  );
}
