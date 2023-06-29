'use client'

import { useEffect, useState } from 'react'

import Container from '@mui/material/Container'

import Cards from '../../components/Card'
import Toolbar from '../../components/Toolbar'

interface Props {
  id: string
  numeroDocumento: string
  tipoDocumento: string
  nome: string
  logradouro: string
  numero: string
  bairro: string
  cidade: string
  uf: string
}

export default function Home() {
  const [data, setData] = useState<Props[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://api-deslocamento.herokuapp.com/api/v1/Cliente',
        )
        const jsonData = await response.json()
        setData(jsonData)
      } catch (error) {
        console.error('Ocorreu um erro:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <Container maxWidth="lg">
      <div>
        <section className="headerContent">
          <Toolbar />
        </section>

        <section>
          <div className="productCards">
            {data?.map((item) => (
              <Cards
                key={item.id}
                id={item.id}
                numeroDocumento={item.numeroDocumento}
                tipoDocumento={item.tipoDocumento}
                nome={item.nome}
                logradouro={item.logradouro}
                numero={item.numero}
                bairro={item.bairro}
                cidade={item.cidade}
                uf={item.uf}
              />
            ))}
          </div>
        </section>
      </div>
    </Container>
  )
}
