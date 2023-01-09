import * as React from "react"

function GridViewIcon(props) {
    return (
        <svg
            width={32}
            height={32}
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <g fill="none" fillRule="evenodd">
                <path d="M-2-2h36v36H-2z" />
                <path
                    d="M0 0h9.412v9.412H0zm0 11.294h9.412v9.412H0zM11.294 0h9.412v9.412h-9.412zm0 11.294h9.412v9.412h-9.412zM22.588 0H32v9.412h-9.412zm0 11.294H32v9.412h-9.412zM0 22.588h9.412V32H0zm11.294 0h9.412V32h-9.412zm11.294 0H32V32h-9.412z"
                    fill="#000"
                />
            </g>
        </svg>
    )
}

export default GridViewIcon
