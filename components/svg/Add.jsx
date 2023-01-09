import * as React from "react"

function Add(props) {
    return (
        <svg
            width="20px"
            height="20px"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <g
                transform="translate(-206 -195) translate(198 187)"
                stroke="none"
                strokeWidth={1}
                fill="none"
                fillRule="evenodd"
            >
                <path d="M0 0H36V36H0z" />
                <path
                    d="M16 16H8.75a.75.75 0 00-.75.75v2.5c0 .414.336.75.75.75H16v7.25c0 .414.336.75.75.75h2.5a.75.75 0 00.75-.75V20h7.25a.75.75 0 00.75-.75v-2.5a.75.75 0 00-.75-.75H20V8.75a.75.75 0 00-.75-.75h-2.5a.75.75 0 00-.75.75V16z"
                    fill="#000"
                />
            </g>
        </svg>
    )
}

export default Add