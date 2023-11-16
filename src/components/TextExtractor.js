/* eslint-disable react-hooks/rules-of-hooks */
import { pdfjs } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import React, { useState } from 'react';
import Tesseract from 'tesseract.js';

const TextExtractor = () => {
    const [tableData, setTableData] = useState([]);
    // const [pdfUrl, setPdfUrl] = useState([]);

    function handleFileChange(event) {
        

        const file = event.target.file[0];
        if(file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const isPdf = file.type === 'application/pdf';
                if(isPdf) {
                    // setPdfUrl(reader.result);
                    extractTextFromPdf(reader.result)
                } else {
                    extractTextFromImage(reader.result)
                }
            };
            reader.readAsDataURL(file);
        }
    }

    function extractTextFromPdf(pdfDataUrl) {
        console.log(pdfDataUrl);
        pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@4.0.189/build/pdf.mjs`;
        // https://unpkg.com/pdfjs-dist@4.0.189/build/pdf.mjs
        // https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js

        const loadingTask = pdfjs.getDocument(pdfDataUrl);
        loadingTask.promise.then((pdfDocument) => {
            const numPages = pdfDocument.numPages;
            let pdfImageUrls = [];

            for(let i=1; i<=numPages; i++) {
                pdfDocument.getPage(i).then((page) => {
                    const viewport = page.getViewport({scale: 2.0});
                    const canvas = document.createElement('canvas');
                    const context = canvas.getContext('2d');
                    canvas.height = viewport.height;
                    canvas.width = viewport.width;

                    const renderContext = {
                        canvasContext: context,
                        viewport: viewport
                    }

                    page.render(renderContext).promise.then(() => {
                        const pdfImageUrl = canvas.toDataURL('image/png');
                        pdfImageUrls.push(pdfImageUrl);
                        if(pdfImageUrls.length === numPages) {
                            extractTextFromPdfImages(pdfImageUrls);
                        }
                    })

                })
            }
        })
    }

    function extractTextFromImage(imageDataUrl) {
        console.log(imageDataUrl);
        Tesseract.recognize(
            imageDataUrl,
            'eng',
            {
                logger: (info) => console.log(info)
            }
        ).then(({ data: { text }}) => {
            handleExtractionResults(text);
        });
    }

    function extractTextFromPdfImages(pdfImageUrls) {
        const promises = pdfImageUrls.map((pdfImageUrl) => 
            Tesseract.recognize(pdfImageUrl, 'eng')
        );

        Promise.all(promises).then((results)=> {
            const combinedText = results.map(({data})=> data.text).join('\n');
            handleExtractionResults(combinedText);
        })
    }

    function handleExtractionResults(text) {
        const invoiceNumber = extractInvoiceNumber(text);
        const invoiceAmount = extractInvoiceAmount(text);
        const supplierName = extractSupplierName(text);

        setTableData([{ invoiceNumber, invoiceAmount, supplierName }]);
    }

    const extractInvoiceNumber = (text) => {
        const match = text.match(/Invoice Number\s+(\d+)/i);
        return match ? match[1] : 'N/A';
    };
      
    const extractInvoiceAmount = (text) => {
        const match = text.match(/Total\s+\$([0-9,.]+)/i);
        return match ? parseFloat(match[1].replace(',', '')) : 0;
    };
      
    const extractSupplierName = (text) => {
        const match = text.match(/Billed from\s+([\s\S]+?)\n/);
        return match ? match[1].trim() : 'N/A';
    };


    return (
        <div>
            <input type="file" onChange={handleFileChange} />

            <div>
                <strong>Extracted Data:</strong>
                <table>
                    <thead>
                    <tr>
                        <th>Invoice Number</th>
                        <th>Invoice Amount</th>
                        <th>Supplier Name</th>
                    </tr>
                    </thead>
                    <tbody>
                    {tableData.map((data, index) => (
                        <tr key={index}>
                            <td>{data.invoiceNumber}</td>
                            <td>{data.invoiceAmount}</td>
                            <td>{data.supplierName}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                
            </div>

        </div>
    )
}

export default TextExtractor;