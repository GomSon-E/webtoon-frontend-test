import React from 'react';
import axios from 'axios';
import styled from 'styled-components'; 

class FileDownloader extends React.Component {
  async fetchFileFromServer(filename) {
    try {
      const response = await axios.get(`/files/${filename}`, {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error fetching the file:', error);
    }
  }

  render() {
    const { files } = this.props;

    return (
      <FileDownloaderContainer>
        <h3>첨부파일</h3>
        <FileList>
          {files.map((file, index) => (
            <FileItem key={index}>
              <DownloadButton onClick={() => this.fetchFileFromServer(file.filename)}>
                {file.name}
              </DownloadButton>
            </FileItem>
          ))}
        </FileList>
      </FileDownloaderContainer>
    );
  }
}

export default FileDownloader;

const FileDownloaderContainer = styled.div`
  padding: 20px;
  border-radius: 8px;
  display: flex;
  flex-direction: row;
`;

const FileList = styled.ul`
  list-style: none;
  padding: 0;
`;

const FileItem = styled.li`
  margin: 0 20px;
`;

const DownloadButton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;
