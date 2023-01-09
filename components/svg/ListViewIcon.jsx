import * as React from "react"

function ListViewIcon(props) {
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
                    d="M0 0h9.14v9.143H0zm0 11.034h9.14v9.143H0zM11.047 0H32v9.143H11.047zm0 11.034H32v9.143H11.047zM0 22.07h9.14v9.143H0zm11.047 0H32v9.143H11.047z"
                    fill="#000"
                />
            </g>
        </svg>
    )
}

export default ListViewIcon
