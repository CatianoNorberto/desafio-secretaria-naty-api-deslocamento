'use client'

import { useEffect, useState } from 'react'

import {
  Box,
  Button,
  Grid,
  Container,
  DialogContent,
  DialogActions,
  MenuItem,
} from '@mui/material'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'

import dayjs from 'dayjs'
import { Form } from '@unform/web'

import NewModal from '../../../components/UI/Modal/NewModal'
import DeslocamentoCards from '../../../components/Deslocamento'
import FormTextField from '../../../components/UI/Forms/FormTextField'

interface IformTextFieldsProps {
  id: string
  kmInicial: number
  kmFinal: number
  inicioDeslocamento: string
  fimDeslocamento: string
  checkList: string
  motivo: string
  observacao: string
  idCondutor: number
  idVeiculo: number
  idCliente: number
}

interface IformTextFieldsDeslocamento {
  id?: string
  kmInicial: number
  kmFinal?: number
  inicioDeslocamento: string
  fimDeslocamento?: string
  checkList: string
  motivo: string
  observacao: string
  idCondutor: number
  idVeiculo: number
  idCliente: number
}

interface ClienteDataProps {
  id: number
  nome: string
}

interface VeiculoDataProps {
  id: number
  marcaModelo: string
}

interface CondutorDataProps {
  id: number
  nome: string
}

export default function Deslocamento() {
  const [data, setData] = useState<IformTextFieldsProps[]>([])
  const [dataClientes, setDataClientes] = useState<ClienteDataProps[]>([])
  const [dataVeiculo, setDataVeiculo] = useState<VeiculoDataProps[]>([])
  const [dataCondutor, setDataCondutor] = useState<CondutorDataProps[]>([])
  const [isOpenModal, setIsOpenModal] = useState(false)

  // função para listar os items para
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

  // são funçôes para listar e buscar id de cada item com os respeitivos endpoints
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://api-deslocamento.herokuapp.com/api/v1/Veiculo',
        )
        const jsonData = await response.json()
        setDataVeiculo(jsonData)
      } catch (error) {
        console.error('Ocorreu um erro:', error)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://api-deslocamento.herokuapp.com/api/v1/Condutor',
        )
        const jsonData = await response.json()
        setDataCondutor(jsonData)
      } catch (error) {
        console.error('Ocorreu um erro:', error)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://api-deslocamento.herokuapp.com/api/v1/Cliente',
        )
        const jsonData = await response.json()
        setDataClientes(jsonData)
      } catch (error) {
        console.error('Ocorreu um erro:', error)
      }
    }
    fetchData()
  }, [])

  // funcão para add novos items, usando metodo post
  const handleSubmit = async (dataForm: IformTextFieldsDeslocamento) => {
    try {
      const response = await fetch(
        'https://api-deslocamento.herokuapp.com/api/v1/Deslocamento/IniciarDeslocamento',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...dataForm }),
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
                    type="number"
                    label="Km Inicial"
                    name="kmInicial"
                    autoComplete="kmInicial"
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
                <Grid item xs={12}>
                  <FormTextField
                    fullWidth
                    name="checkList"
                    label="Check List"
                    type="text"
                    id="checkList"
                    autoComplete="checkList"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormTextField
                    fullWidth
                    name="motivo"
                    label="Motivo"
                    type="text"
                    id="motivo"
                    autoComplete="motivo"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormTextField
                    fullWidth
                    name="observacao"
                    label="Observação"
                    type="text"
                    id="observacao"
                    autoComplete="observacao"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormTextField
                    fullWidth
                    name="idCondutor"
                    label="Id do Condutor"
                    type=""
                    select
                    id="idCondutor"
                    autoComplete="idCondutor"
                  >
                    {dataCondutor?.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.nome}
                      </MenuItem>
                    ))}
                  </FormTextField>
                </Grid>
                <Grid item xs={12}>
                  <FormTextField
                    fullWidth
                    name="idVeiculo"
                    label="Id do Veiculo"
                    type=""
                    select
                    id="idVeiculo"
                    autoComplete="idVeiculo"
                  >
                    {dataVeiculo?.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.marcaModelo}
                      </MenuItem>
                    ))}
                  </FormTextField>
                </Grid>
                <Grid item xs={12}>
                  <FormTextField
                    fullWidth
                    name="idCliente"
                    label="Id do Cliente"
                    type=""
                    select
                    id="idCliente"
                    autoComplete="idCliente"
                  >
                    {dataClientes?.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.nome}
                      </MenuItem>
                    ))}
                  </FormTextField>
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
              {data?.map((item) => {
                const formatarData = (data: any) => {
                  return dayjs(data).format('DD/MM/YYYY')
                }

                const inicioData = formatarData(item.inicioDeslocamento)
                const finalData = formatarData(item.fimDeslocamento)

                return (
                  <DeslocamentoCards
                    key={item.id}
                    id={item.id}
                    kmInicial={item.kmInicial}
                    kmFinal={item.kmFinal}
                    inicioDeslocamento={inicioData}
                    fimDeslocamento={finalData}
                    checkList={item.checkList}
                    motivo={item.motivo}
                    observacao={item.observacao}
                    idCondutor={item.idCondutor}
                    idVeiculo={item.idVeiculo}
                    idCliente={item.idCliente}
                  />
                )
              })}
            </div>
          </section>
        </div>
      </Container>
    </>
  )
}
