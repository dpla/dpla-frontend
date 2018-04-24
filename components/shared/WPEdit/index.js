import React from "react";

import { endsWith } from "lib";
import { WORDPRESS_URL } from "constants/env";

const WPEdit = ({ page, url }) => {
  const edit = endsWith(url.asPath, "?edit")
    ? <div>
        <a
          href={`${WORDPRESS_URL}/wp-admin/post.php?post=${page.id}&action=edit`}
          target="_blank"
        >
          Edit in WP
        </a>
      </div>
    : null;
  return edit;
};

export default WPEdit;
