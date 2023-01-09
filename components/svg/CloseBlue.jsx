import * as React from "react"

function CloseBlue(props) {
    return (
        <svg
            width={18}
            height={18}
            viewBox="0 0 18 18"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <g fill="none" fillRule="evenodd">
                <path d="M-9-9h36v36H-9z" />
                <path
                    d="M11.187 9l6.632-6.633a.615.615 0 000-.871L16.504.181a.616.616 0 00-.871 0L9 6.813 2.367.181a.633.633 0 00-.871 0L.18 1.496c-.24.24-.24.63 0 .871l6.633 6.634L.18 15.633c-.24.24-.24.63 0 .872l1.316 1.314a.615.615 0 00.87 0L9 11.187l6.633 6.632a.616.616 0 00.871 0l1.315-1.314a.616.616 0 000-.872L11.187 9z"
                    fill="#000"
                />
            </g>
        </svg>
    )
}

export default CloseBlue
