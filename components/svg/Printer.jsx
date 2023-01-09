import * as React from "react"

function Printer(props) {
    return (
        <svg
            width={30}
            height={26}
            viewBox="0 0 30 26"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <g fill="none" fillRule="evenodd">
                <path d="M-3-5h36v36H-3z" />
                <path
                    d="M30 6.583h-4.69V0H4.613v6.584L0 6.583v12.844h4.613v5.906H25.31v-5.906H30V6.583zM6.667 2.333H23v4.334H6.667V2.333zm0 21V12.667H23v10.666H6.667zM21 17H9v-2h12v2zm0 3.333H9v-2h12v2z"
                    fill="#000"
                />
            </g>
        </svg>
    )
}

export default Printer
