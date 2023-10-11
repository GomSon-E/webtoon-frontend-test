import React, { useState, useRef } from "react";
import styled from 'styled-components';
import theme from '../style/theme';

function createFileObject(
    bits: Blob[],
    name: string,
    options?: BlobPropertyBag
) {
    try {
        return new File(bits, name, options);
    } catch (err) {
        /** IE 는 File API 를 지원하지 않기 때문에 Blob 을 사용합니다. */
        const blob: any = new Blob(bits, options || {});
        blob.lastModified = Date.now();
        blob.name = name;
        return blob as File;
    }
}

function createRandomFilename() {
    return `file_${crypto.getRandomValues(new Uint32Array(1))}`;
}

export default function FileInput() {
    const inputRef = useRef<HTMLInputElement>(null);
    const [files, setFiles] = useState<File[]>([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFiles(Array.from(e.target.files || []));
    };

    const handleDelete = (index: number) => {
        const newFiles = [...files.slice(0, index), ...files.slice(index + 1)];

        const store = new DataTransfer();
        newFiles.forEach((file) => store.items.add(file));

        if (inputRef.current) {
            inputRef.current.files = store.files;
        }

        setFiles(newFiles);
    };

    const handleRename = (index: number) => {
        const originFile = files[index];
        const newFilename = createRandomFilename();
        const newFileObject = createFileObject([originFile], newFilename, {
            type: originFile.type
        });

        const store = new DataTransfer();
        const copy = [...files];
        copy[index] = newFileObject;
        copy.forEach((file) => store.items.add(file));

        if (inputRef.current) {
            inputRef.current.files = store.files;
        }

        setFiles(copy);
    };

    return (
        <FileUploadContainer>
            <input ref={inputRef} type="file" multiple onChange={handleChange} />
            <FileList>
                {files.map((file, index) => (
                <FileList2 key={`${file.name}_${index}`}>
                    {file.name}
                    <Btn onClick={() => handleDelete(index)}>삭제</Btn>
                    <Btn onClick={() => handleRename(index)}>이름변경</Btn>
                </FileList2>
                ))}
            </FileList>            
        </FileUploadContainer>
    );
}

const FileUploadContainer = styled.div`
    width: 600px;
    height: auto;
    border-radius: 7px;
    border: 1px solid #bfbfbf;
    margin-top: 15px;
    padding: 15px 0px 0px 10px;
`

const FileList = styled.ul`
    list-style:none;
    padding-left:0px;
    margin-bottom: 10px;
`

const FileList2 = styled.li`
    margin-bottom: 6px;
`

const Btn = styled.button`
    margin-right: 5px;
    margin-left: 5px;
`