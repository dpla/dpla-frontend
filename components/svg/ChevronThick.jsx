import * as React from "react"

function ChevronThick(props) {
    return (
        <svg
            width="15px"
            height="24px"
            viewBox="0 0 15 24"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M186.104 205.324l11.441 11.641-11.512 11.71a1.074 1.074 0 01-1.54 0l-1.173-1.194h-.001a1.116 1.116 0 01-.319-.784c0-.293.114-.574.319-.782l8.797-8.95-8.727-8.88a1.122 1.122 0 010-1.566l1.174-1.194v-.001a1.081 1.081 0 011.541 0z"
                transform="translate(-183 -205)"
                fill="#000"
            />
        </svg>
    )
}

export default ChevronThick