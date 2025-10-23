import { useState } from "react"
import { v4 as uuidv4 } from 'uuid';

export default function HashGenerator(){
    const [uuidResult, setUuidResult] = useState("");
    const [hashInput, setHashInput] = useState("");
    const [hashResult, setHashResult] = useState("");
    const [base64Input, setBase64Input] = useState("");
    const [base64Result, setBase64Result] = useState("");
    return (
        <div>
            <h1 className="text-2xl font-bold">Hash Generator</h1>
        </div>
    )
}