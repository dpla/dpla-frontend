import React from "react";

import MainLayout from "components/MainLayout";
import OptionsBar from "components/SearchComponents/OptionsBar";
import MainContent from "components/SearchComponents/MainContent";
import {
  classNames,
  stylesheet
} from "components/SearchComponents/SearchComponents.css";

const Search = ({ url }) =>
  <MainLayout>
    <div className={classNames.wrapper}>
      <OptionsBar route={url} />
      <MainContent route={url} />
    </div>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </MainLayout>;

export default Search;
