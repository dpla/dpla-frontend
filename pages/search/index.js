import React from "react";

import MainLayout from "components/MainLayout";
import OptionsBar from "components/SearchComponents/OptionsBar";
import {
  classNames,
  stylesheet
} from "components/SearchComponents/SearchComponents.css";

const Search = ({ url }) =>
  <MainLayout>
    <div className={classNames.wrapper}>
      <OptionsBar />
    </div>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </MainLayout>;

export default Search;
