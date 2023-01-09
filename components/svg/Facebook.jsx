import * as React from "react"

function Facebook(props) {
    return (
        <svg
            width="24px"
            height="24px"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                opacity={0.75}
                fill="#fff"
                d="M386.675 205h-21.35c-.733 0-1.325.593-1.325 1.325v21.35c0 .732.592 1.325 1.325 1.325h11.494v-9.294h-3.129v-3.621h3.129v-2.674c0-3.1 1.893-4.786 4.659-4.786 1.325 0 2.463.096 2.794.142v3.24h-1.92c-1.5 0-1.792.72-1.792 1.77v2.31h3.585l-.465 3.63h-3.12V229h6.115c.733 0 1.325-.593 1.325-1.325v-21.35c0-.732-.592-1.325-1.325-1.325"
                transform="translate(-364 -205)"
                stroke="none"
                strokeWidth={1}
                fillRule="evenodd"
            />
        </svg>
    )
}

export default Facebook
