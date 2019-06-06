import React from "react";
import jsPDF from "jspdf";

const ReportTable = ({report}) => {


    const pdfCreate=(e)=>{
        e.preventDefault()

        const doc = new jsPDF
        doc.text(
            `
                    ************************************************************************
               
                                    Report from: ${report.startDate}  to: ${report.endDate}
                                    
                                    ${report.country?(`Countries: ${report.country.join(',')}`):`Countries: all`}
                                    ${report.city?(`Cities: ${report.city.join(',')}`):`Cities: all`}
                                    ${report.foodGroup?(`Food groups: ${report.foodGroup.join(',')}`):`Food groups: all`}
                                    ${report.regSellersCount>>0?(`Registered sellers: ${report.regSellersCount}`):`Registered sellers: 0`}  
                                    ${report.OSSaverage>0?(`OSS average value: ${report.OSSaverage}`):`OSS average value: 0`}
                                    ${report.flag>0?(`Red flagged sellers: ${report.flag}`):`Red flagged sellers: 0`}
                                    ${report.stars>0?(`Stars average: ${report.stars}`):`Stars average: 0`}
                                    ${report.calls>0?(`Calls count: ${report.calls}`):`Calls count: 0`}
                                    ${report.cards>0?(`Cards transactions: ${report.cards}`):`Cards transactions: 0`}
                                    ${report.total>0?(`Total profit on cards: ${report.total}`):`Total profit on cards: 0`}
                                    
                   **************************************************************************
                
                `
            ,1,1);

        doc.save('cardInfo.pdf')
    };


    if (Object.keys(report).length>0) {

            const reportArr =(reportData)=> {
                const arrReport=reportData.map((elem) => {
                    return <li key={elem}>{elem}</li>
                });

                return arrReport
            };

        return (
            <div className={'reportResultContainer'}>
                <h1>Report from {report.startDate} to {report.endDate}</h1>
                <table>
                    <tbody>
                    <tr><th>Countries:</th>{report.country ?(<td><ul>
                        {reportArr(report.country)}
                    </ul></td>):<td>All</td>}</tr>

                    <tr><th>Cities:</th>{report.city ?(<td><ul>
                        {reportArr(report.city)}
                    </ul></td>):<td>All</td>}</tr>

                    <tr><th>Food groups:</th>{report.foodGroup ?(<td><ul>
                        {reportArr(report.foodGroup)}
                    </ul></td>):<td>All</td>}</tr>
                    {report.regSellersCount>0?(<tr><th>Registered sellers:</th><td>{report.regSellersCount}</td></tr>):<tr><th>Registered sellers:</th><td>0</td></tr>}
                    {report.OSSaverage>0?(<tr><th>OSS average value:</th><td>{report.OSSaverage}</td></tr>):<tr><th>OSS average value:</th><td>0</td></tr>}
                    {report.flag>0?(<tr><th>Red flagged sellers:</th><td>{report.flag}</td></tr>):<tr><th>Red flagged sellers:</th><td>0</td></tr>}
                    {report.stars>0?(<tr><th>Stars average:</th><td>{report.stars}</td></tr>):<tr><th>Stars average:</th><td>0</td></tr>}
                    {report.calls>0?(<tr><th>Calls count:</th><td>{report.calls}</td></tr>):<tr><th>Calls count:</th><td>0</td></tr>}
                    {report.cards>0?(<tr><th>Cards transactions:</th><td>{report.cards}</td></tr>):<tr><th>Cards transactions:</th><td>0</td></tr>}
                    {report.total>0?(<tr><th>Total profit on cards:</th><td>{report.total} USD</td></tr>):<tr><th>Total profit on cards:</th><td>0 USD</td></tr>}
                    </tbody>
                </table>
                <button onClick={pdfCreate}>Print</button>
            </div>
        )
    } else return null

};

export default ReportTable