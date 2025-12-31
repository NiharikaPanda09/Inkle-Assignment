import React, {useEffect, useState} from 'react'
import { MapPin } from 'lucide-react'

export default function EditModal({item, countries, onClose, onSave}){
  const [form, setForm] = useState({...item})
  const [openList, setOpenList] = useState(false)
  const [localCountries, setLocalCountries] = useState(countries || [])
  const [editingCountryId, setEditingCountryId] = useState(null)
  const [editingCountryName, setEditingCountryName] = useState('')

  useEffect(()=>{
    setForm({...item})
    setLocalCountries(countries || [])
  },[item])

  useEffect(()=>{
    setLocalCountries(countries || [])
  },[countries])

  function updateField(k, v){
    setForm(prev=>({...prev, [k]: v}))
  }

  function handleSave(){
    if(!form.name){alert('Name required');return}
    onSave(form)
  }

  function handleSelectCountry(c){
    updateField('country', c.name)
    setOpenList(false)
  }

  function handleEditCountry(e, c){
    e.stopPropagation()
    setEditingCountryId(c.id)
    setEditingCountryName(c.name)
  }

  function handleSaveCountry(e, c){
    e.stopPropagation()
    setLocalCountries(prev=> prev.map(pc => pc.id === c.id ? {...pc, name: editingCountryName} : pc))
    // if selected country is the one edited, update the form value
    if(form.country === c.name){
      updateField('country', editingCountryName)
    }
    setEditingCountryId(null)
    setEditingCountryName('')
  }

  function handleCancelEdit(e){
    e.stopPropagation()
    setEditingCountryId(null)
    setEditingCountryName('')
  }

  return (
    <div className="modalBackdrop">
      <div className="modal">
        <h3>Edit Customer</h3>
        <div className="formRow">
          <label style={{display:'block',fontSize:13,marginBottom:6}}>Name *</label>
          <input className="input" value={form.name || ''} onChange={e=>updateField('name', e.target.value)} />
        </div>
        <div className="formRow">
          <label style={{display:'block',fontSize:13,marginBottom:6}}>Country</label>

          <div className="selectCustom">
            <div className="selectBox" onClick={()=>setOpenList(v=>!v)} role="button" tabIndex={0}>
              <div className="label">{form.country || ''}</div>
              <div className="caret">▾</div>
            </div>

            {openList && (
              <div className="countryList">
                {localCountries.map(c=> (
                  <div key={c.id} className="countryItem" onClick={()=>handleSelectCountry(c)}>
                    <div className="countryLeft">
                      <span className="pinIcon" aria-hidden>
                        <MapPin size={18} color="#9aa0a6" />
                      </span>
                      <span>
                        {editingCountryId === c.id ? (
                          <input className="countryEditInput" value={editingCountryName} onChange={e=>setEditingCountryName(e.target.value)} onClick={e=>e.stopPropagation()} />
                        ) : (
                          c.name
                        )}
                      </span>
                    </div>
                    <div style={{display:'flex',gap:8,alignItems:'center'}}>
                      {editingCountryId === c.id ? (
                        <>
                          <button className="smallBtn" onClick={(e)=>handleSaveCountry(e, c)}>Save</button>
                          <button className="smallBtn" onClick={handleCancelEdit}>Cancel</button>
                        </>
                      ) : (
                        <div className="editIcon" onClick={(e)=>handleEditCountry(e, c)} title={`Edit ${c.name}`}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 21v-3.75L14.06 6.19a2 2 0 0 1 2.83 0l1.92 1.92a2 2 0 0 1 0 2.83L7.75 21H3z" stroke="#6c2bd9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M14 5l5 5" stroke="#6c2bd9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="modalFooter">
          <button className="btn ghost" onClick={onClose}>Cancel</button>
          <button className="btn primary" onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  )
}
