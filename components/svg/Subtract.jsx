import * as React from "react"

function Subtract(props) {
    return (
        <svg
            width="20px"
            height="4px"
            viewBox="0 0 20 4"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <g
                transform="translate(-150 -203) translate(142 187)"
                stroke="none"
                strokeWidth={1}
                fill="none"
                fillRule="evenodd"
            >
                <path d="M0 0H36V36H0z" />
                <rect fill="#000" x={8} y={16} width={20} height={4} rx={0.75} />
            </g>
        </svg>
    )
}

export default Subtract
