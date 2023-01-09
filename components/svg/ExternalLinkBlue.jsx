import * as React from "react"

function ExternalLinkBlue(props) {
    return (
        <svg
            width="24px"
            height="24px"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M327.454 205v2.727h4.91L319 221.091l1.909 1.909 13.364-13.363v4.91H337V205h-9.546zm6.88 21.335h-18.668v-18.669h9.335V205h-9.335a2.674 2.674 0 00-2.666 2.666v18.668c0 1.466 1.2 2.666 2.666 2.666h18.668c1.466 0 2.666-1.2 2.666-2.666v-9.335h-2.666v9.336z"
                transform="translate(-313 -205)"
                fill="#5AB4DC"
                stroke="none"
                strokeWidth={1}
                fillRule="evenodd"
            />
        </svg>
    )
}

export default ExternalLinkBlue
