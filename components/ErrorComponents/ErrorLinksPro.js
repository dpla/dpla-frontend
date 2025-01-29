import React from "react";
import Link from "next/link";

function ErrorLinksPro() {
    return (
        <ul>
            <li>
                learn{" "}
                <Link href="/pro/wp?section=about-dpla-pro" as="/about">
                    about DPLA
                </Link>{" "}as an organization
            </li>
            <li>
                explore our{" "}
                <Link href="/pro/wp?section=projects" as="/projects">
                    projects
                </Link>
            </li>
            <li>
                get information about our{" "}
                <Link href="/pro/wp?section=events" as="/events">
                    events
                </Link>
            </li>
            <li>
                engage with our{" "}
                <Link href="/pro/wp/hubs?section=hubs" as="/hubs">
                    Hub Network
                </Link>
            </li>
            <li>
                discover our{" "}
                <Link href="/pro/wp?section=developers" as="/developers">
                    resources for developers
                </Link>
            </li>
            <li>
                read about our work in{" "}
                <Link href="/pro/wp?section=education" as="/education">
                    education
                </Link>
            </li>
            <li>
                meet our Community Reps and learn about the {" "}
                <Link href="/pro/wp?section=community-reps" as="/community-reps">
                    reps program
                </Link>
            </li>
            <li>
                find out more about our work with {" "}
                <Link href="/pro/wp?section=ebooks" as="/ebooks">
                    ebooks
                </Link>
            </li>
        </ul>
    );
}

export default ErrorLinksPro;
