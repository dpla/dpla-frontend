import React from "react";

import MainLayout from "components/MainLayout";
import FeatureHeader from "shared/FeatureHeader";

import utils from "stylesheets/utils.scss";

const TITLE = "Lists";
const DESCRIPTION = "Your lists.";

const Lists = ({ url }) =>
  <MainLayout route={url} pageTitle={TITLE}>
    <div id="main" role="main">
      <FeatureHeader title={TITLE} description={DESCRIPTION} />
      <div className={`${utils.container}`}>
        <div className="">
          <ul className="">
            <li>one</li>
            <li>two</li>
            <li>three</li>
          </ul>
          <p>
            Quia adipisci a cupiditate inventore. Fugit ratione quia cumque
            ipsum. Aut porro occaecati id quasi. Et nemo dolores et et ut.
          </p>
          <p>
            Placeat molestias veniam repudiandae quo quos non. Possimus incidunt
            et quia perferendis rerum sint tenetur qui. Nesciunt laudantium
            quasi doloribus. Corporis deserunt consequuntur in dolorum velit
            repudiandae.
          </p>

          <p>
            Omnis architecto voluptas odio consequatur. Sit expedita error
            dolorum qui non temporibus nihil. Sit maxime quia repellendus omnis
            laudantium qui aut. Inventore voluptatem dolores est exercitationem.
          </p>

          <p>
            Sed qui fugiat unde ut amet veritatis rerum voluptas. Consequatur
            ducimus qui esse molestiae repellat sunt. Ut enim aliquid veritatis
            molestiae est sapiente. Autem quaerat est commodi expedita
            accusantium fugit culpa. Rerum quos nam beatae et est. Minus aperiam
            illo minus eum ex animi.
          </p>
          <p>
            Quisquam non dolores ex esse qui. Saepe hic ut illum magnam aperiam
            repudiandae. Culpa eius est hic. Beatae explicabo quisquam et
            similique quae. Quos accusamus laboriosam perspiciatis aspernatur
            architecto eos repudiandae voluptatibus.
          </p>

        </div>
      </div>
    </div>
  </MainLayout>;

Lists.getInitialProps = async ({ req }) => {
  return {};
};

export default Lists;
