import { Layout } from '@/components/Layouts/Layout'
import React from 'react'
import privacyPolicy from '../content/privacy.json'

const Privacy = () => {


    return (
        <Layout title='Privacidad'>
            <div style={{ padding: "100px 200px" }}>
                <h2 style={{ marginBottom: "10px" }} >
                    Última modificación: {privacyPolicy.lastModified}
                </h2>
                <p style={{ marginBottom: "20px" }} >
                    {privacyPolicy.privacyPolicy}
                </p>
                <ol>
                    {privacyPolicy.points.map((point, index) => (
                        <li key={index} style={{ marginBottom: "10px" }}>{point}</li>
                    ))}
                </ol>
            </div>
        </Layout>
    );
}

export default Privacy;