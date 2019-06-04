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
                <table>
                    <tbody>
                    <tr><th>Countries</th>{report.country ?(<td><ul>
                        {reportArr(report.country)}
                    </ul></td>):<td>All</td>}</tr>

                    <tr><th>Cities</th>{report.city ?(<td><ul>
                        {reportArr(report.city)}
                    </ul></td>):<td>All</td>}</tr>

                    <tr><th>Food groups</th>{report.foodGroup ?(<td><ul>
                        {reportArr(report.foodGroup)}
                    </ul></td>):<td>All</td>}</tr>


                    </tbody>
                </table>
            </div>
        )
    } else return null

};

export default ReportTable