import React, {useEffect, useMemo, useState} from 'react'
import axios from 'axios'
import TableView from './components/TableView'
import EditModal from './components/EditModal'

const TAXES_API = 'https://685013d7e7c42cfd17974a33.mockapi.io/taxes'
const COUNTRIES_API = 'https://685013d7e7c42cfd17974a33.mockapi.io/countries'

export default function App(){
  const [data,setData] = useState([])
  const [countries,setCountries] = useState([])
  const [loading,setLoading] = useState(false)
  const [editing, setEditing] = useState(null)

  useEffect(()=>{
    loadAll()
  },[])

  async function loadAll(){
    setLoading(true)
    try{
      const [tRes, cRes] = await Promise.all([
        axios.get(TAXES_API),
        axios.get(COUNTRIES_API)
      ])
      setData(tRes.data)
      setCountries(cRes.data)
    }catch(err){
      console.error(err)
    }finally{setLoading(false)}
  }

  async function handleSave(updated){
    // PUT full object back to API
    try{
      const resp = await axios.put(`${TAXES_API}/${updated.id}`, updated)
      // update local
      setData(d=>d.map(item=>item.id===updated.id? resp.data : item))
      setEditing(null)
    }catch(err){
      console.error(err)
      alert('Save failed')
    }
  }

  return (
    <div className="container">
      <div className="card">
        <h2 style={{margin:0, marginBottom:12}}>Customers</h2>
        <TableView data={data} loading={loading} onEdit={row=>setEditing(row)} />
      </div>
      {editing && (
        <EditModal
          item={editing}
          countries={countries}
          onClose={()=>setEditing(null)}
          onSave={handleSave}
        />
      )}
    </div>
  )
}
