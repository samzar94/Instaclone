import React from 'react'
import {Form, Button} from 'semantic-ui-react'
import {toast} from 'react-toastify'
import {useMutation} from '@apollo/client'
import {UPDATE_USER} from '../../../gql/user'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import "./SiteWebForm.scss"
import { validateSchema } from 'graphql'

export default function SiteWebForm(props) {
    const {setShowModal, currentSiteWeb, refetch}=props;
    const [updateUser]=useMutation(UPDATE_USER);

    const formik=useFormik({
        initialValues:{
            siteWeb:currentSiteWeb||"",
        },
        validationSchema:-Yup.object({
            siteWeb:Yup.string().required(),
        }),
        onSubmit: async(formData)=>{
            try {
                await updateUser({
                    variables:{
                        input:formData//tiene clave(siteWeb) y valor(http:hola.com)
                    }
                });
                refetch();
                setShowModal(false);
            } catch (error) {
                toast.error("Error al actualizar tu sitio web");
            }
        }
        
    })
    
    return (
       <Form className="site-web-form" onSubmit={formik.handleSubmit}>
           <Form.Input placeholder="URL web" name="siteWeb" value={formik.values.siteWeb} onChange={formik.handleChange}
           error={formik.errors.SiteWeb && true}
           />
           <Button type="submit" className="btn-submit">Actualizar</Button>
       </Form>
    )
}
