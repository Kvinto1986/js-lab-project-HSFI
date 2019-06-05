import React, {Fragment} from "react";

const ReportTable = ({report}) => {

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
                    <h2>Sellers information:</h2>
                    <tr><th>Countries:</th>{report.country ?(<td><ul>
                        {reportArr(report.country)}
                    </ul></td>):<td>All</td>}</tr>

                    <tr><th>Cities:</th>{report.city ?(<td><ul>
                        {reportArr(report.city)}
                    </ul></td>):<td>All</td>}</tr>

                    <tr><th>Food groups:</th>{report.foodGroup ?(<td><ul>
                        {reportArr(report.foodGroup)}
                    </ul></td>):<td>All</td>}</tr>
                    {report.regSellersCount&&(<tr><th>Registered sellers:</th><td>{report.regSellersCount}</td></tr>)}
                    {report.OSSaverage&&(<tr><th>OSS average value:</th><td>{report.OSSaverage}</td></tr>)}
                    {report.flag>0&&(<tr><th>Red flagged sellers:</th><td>{report.flag}</td></tr>)}
                    {report.stars&&(<tr><th>Stars average:</th><td>{report.stars}</td></tr>)}
                    <h2>General information:</h2>
                    {report.calls&&(<tr><th>Calls count:</th><td>{report.calls}</td></tr>)}
                    {report.cards&&(<tr><th>Cards transactions:</th><td>{report.cards}</td></tr>)}
                    {report.total&&(<tr><th>Total profit on cards:</th><td>{report.total} USD</td></tr>)}
                    </tbody>
                </table>
                <button>Print</button>
            </div>
        )
    } else return null

};

export default ReportTable