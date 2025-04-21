import React from "react";
import Link from "next/link";
import {useRouter} from "next/router";

import css from "./ExhibitionSection.module.scss";
import utils from "stylesheets/utils.module.scss";

function Header({ title }) {
  const router = useRouter();
  return (
    <div className={`${css.header} ${utils.container}`}>
      <div className={css.exhibitionsLinkAndTitle}>
        <Link href="/exhibitions" className={css.exhibitionsLink}>
          Exhibitions
        </Link>
        <h1 className={css.exhibitionTitle}>{title}</h1>
      </div>
      <div className={css.closeExhibition}>
      <Link
        href={`/exhibitions/${router.query.exhibitionSlug}`}
        className={`hover-underline ${css.closeExhibition}`}
      >
        <svg
          className={css.closeIcon}
          width="18"
          height="18"
          viewBox="0 0 18 18"
        >
          <g fill="none" fillRule="evenodd">
            <path d="M-9-9h36v36H-9z" />
            <path
              className={css.closeIconX}
              d="M11.1869671 9.0007313l6.6321036-6.6336231c.241215-.2405136.241215-.6305716 0-.8710852L16.5043505.1805657C16.3886778.0648899 16.2320966 0 16.0684517 0c-.1636448 0-.3202116.0648899-.4358987.1805657L8.9997271 6.8134666 2.3669012.1805657c-.230634-.23134078-.6404416-.23134078-.8710756 0L.18038312 1.496023c-.24051083.2405136-.24051083.6305716 0 .8710852L6.8132094 9.0007313.18038312 15.6329099c-.24051083.2405136-.24051083.6305716 0 .8717894l1.31544248 1.314735C1.6107941 17.9351083 1.7680795 18 1.9317247 18c.1629298 0 .3202116-.0648917.4351946-.1805657l6.6328258-6.6329009 6.6328259 6.6329009c.1156727.115674.2722539.1805657.4358988.1805657.1636448 0 .3202116-.0648917.4358987-.1805657l1.3147202-1.314735c.2412151-.2412178.2412151-.6312758 0-.8717894l-6.6321216-6.6321786z"
            />
          </g>
        </svg><span className={css.closeExhibitionText}>Close&nbsp;Exhibition</span>
      </Link>
      </div>
    </div>
  );
}

export default Header;
