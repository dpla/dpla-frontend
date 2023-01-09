import * as React from "react"

function ChevronThickOrange(props) {
    return (
        <svg
            width="15px"
            height="24px"
            viewBox="0 0 15 24"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                fill="#DD5C00"
                d="M201.949 212.831l-11.642 11.442-11.709-11.512a1.074 1.074 0 010-1.54l1.194-1.174v-.001c.207-.204.489-.319.784-.319.293 0 .574.115.782.319l8.95 8.797 8.88-8.726a1.122 1.122 0 011.566 0l1.193 1.173h.002a1.081 1.081 0 010 1.541z"
                transform="translate(-183 -205) rotate(-90 190.273 217)"
                stroke="none"
                strokeWidth={1}
                fillRule="evenodd"
            />
        </svg>
    )
}

export default ChevronThickOrange
