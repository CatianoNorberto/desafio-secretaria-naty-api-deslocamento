'use client'

import { useEffect, useState } from 'react'

import {
  Box,
  Button,
  Grid,
  Container,
  DialogContent,
  DialogActions,
} from '@mui/material'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'

import { Form } from '@unform/web'

import Header from '../../../components/Header'
import NewModal from '../../../components/UI/Modal/NewModal'
import DeslocamentoCards from '../../../components/Deslocamento'
import FormTextField from '../../../components/UI/Forms/FormTextField'

interface IformTextFieldsDeslocamento {
  id: string
  kmInicial: string
  kmFinal: string
  inicioDeslocamento: string
  fimDeslocamento: string
  checkList: string
  motivo: string
  observacao: string
  idCondutor: string
  idVeiculo: string
  idCliente: string
}

export default function Deslocamento() {
  const [data, setData] = useState<IformTextFieldsDeslocamento[]>([])
  const [isOpenModal, setIsOpenModal] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://api-deslocamento.herokuapp.com/api/v1/Deslocamento',
        )
        const jsonData = await response.json()
        setData(jsonData)
      } catch (error) {
        console.error('Ocorreu um erro:', error)
      }
    }

    fetchData()
  }, [])

  const handleSubmit = async (data: IformTextFieldsDeslocamento) => {
    try {
      const response = await fetch(
        'https://api-deslocamento.herokuapp.com/api/v1/Deslocamento/IniciarDeslocamento',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        },
      )

      const responseData = await response.json()
      console.log(responseData)
    } catch (error) {
      console.error('Ocorreu um erro:', error)
    }
  }

  const toggleModal = () => {
    setIsOpenModal(true)
  }
  const handleClose = () => {
    setIsOpenModal(false)
  }

  return (
    <>
      <NewModal
        title="Novos Deslocamento"
        isOpen={isOpenModal}
        onClose={handleClose}
      >
        <Box sx={{ mt: 3 }}>
          <Form onSubmit={(dados) => handleSubmit(dados)}>
            <DialogContent>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <FormTextField
                    fullWidth
                    id="kmInicial"
                    type="kmInicial"
                    label="Km Inicial"
                    name="kmInicial"
                    autoComplete="kmInicial"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormTextField
                    fullWidth
                    id="kmFinal"
                    type="kmFinal"
                    label="Km Final"
                    name="kmFinal"
                    autoComplete="kmFinal"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormTextField
                    fullWidth
                    type="date"
                    id="inicioDeslocamento"
                    name="inicioDeslocamento"
                    autoComplete="inicioDeslocamento"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormTextField
                    fullWidth
                    type="date"
                    id="fimDeslocamento"
                    name="fimDeslocamento"
                    autoComplete="fimDeslocamento"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormTextField
                    fullWidth
                    name="checkList"
                    label="Check List"
                    type="checkList"
                    id="checkList"
                    autoComplete="checkList"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormTextField
                    fullWidth
                    name="motivo"
                    label="Motivo"
                    type="motivo"
                    id="motivo"
                    autoComplete="motivo"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormTextField
                    fullWidth
                    name="observacao"
                    label="Observação"
                    type="observacao"
                    id="observacao"
                    autoComplete="observacao"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormTextField
                    fullWidth
                    name="idCondutor"
                    label="Id do Condutor"
                    type="idCondutor"
                    id="idCondutor"
                    autoComplete="idCondutor"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormTextField
                    fullWidth
                    name="idVeiculo"
                    label="Id do Veiculo"
                    type="idVeiculo"
                    id="idVeiculo"
                    autoComplete="idVeiculo"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormTextField
                    fullWidth
                    name="idCliente"
                    label="Id do Cliente"
                    type="idCliente"
                    id="idCliente"
                    autoComplete="idCliente"
                  />
                </Grid>
              </Grid>
            </DialogContent>

            <DialogActions>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Confirmar
              </Button>
            </DialogActions>
          </Form>
        </Box>
      </NewModal>

      <Container maxWidth="lg">
        <Header />

        <div>
          <section className="headerContent">
            <Box flex={1} display="flex" justifyContent="end">
              <Button
                color="primary"
                disableElevation
                variant="contained"
                endIcon={<AddOutlinedIcon />}
                onClick={toggleModal}
              >
                Novo
              </Button>
            </Box>
          </section>

          <section>
            <div className="productCards">
              {data?.map((item) => (
                <DeslocamentoCards
                  key={item.id}
                  id={item.id}
                  kmInicial={item.kmInicial}
                  kmFinal={item?.kmFinal}
                  inicioDeslocamento={item.inicioDeslocamento}
                  fimDeslocamento={item?.fimDeslocamento}
                  checkList={item.checkList}
                  motivo={item.motivo}
                  observacao={item.observacao}
                  idCondutor={item.idCondutor}
                  idVeiculo={item.idVeiculo}
                  idCliente={item.idCliente}
                />
              ))}
            </div>
          </section>
        </div>
      </Container>
    </>
  )
}
