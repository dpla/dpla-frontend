import * as React from "react"

function Heart(props) {
    return (
        <svg
            width={30}
            height={27}
            viewBox="0 0 30 27"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <g fill="none" fillRule="evenodd">
                <path d="M-3-5h36v36H-3z" />
                <path
                    d="M15 4.46C7.585-3.992 1.847 1.847.877 3.59-.889 6.814.17 11.695 2.643 14.048L15.002 26.25 27.36 14.048c2.47-2.353 3.529-7.232 1.763-10.458C28.15 1.846 22.06-3.993 15 4.46z"
                    fill="#E04F8E"
                />
            </g>
        </svg>
    )
}

export default Heart
