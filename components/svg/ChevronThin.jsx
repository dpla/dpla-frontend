import * as React from "react"

function ChevronThin(props) {
    return (
        <svg
            width="13px"
            height="48px"
            viewBox="0 0 13 24"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                fill="#000"
                opacity={0.4}
                transform="translate(-224 -205)"
                stroke="none"
                strokeWidth={1}
                fillRule="evenodd"
                d="M235.804001 216.293399L224.694184 205 224 205.705655 235.109817 217.000012 224 228.293411 224.694184 229 236.5 217.00006z"
            />
        </svg>
    )
}

export default ChevronThin
