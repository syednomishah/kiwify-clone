import { XMarkIcon } from '@heroicons/react/24/solid'
import { ExpandMore } from '@mui/icons-material'
import { Accordion, AccordionDetails, AccordionSummary, Checkbox, FormGroup, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'

export default function ClassesList({classes, currentContent, handleChecked, handleChangeVideo, setCurrentContent}) {
    const getFinished = clas=> clas.contents.filter(con=> con.finished).length;

  return (
    <div>
        <div className="flex justify-between items-center p-4">
            <p className="text-xl">Classes</p>
            <XMarkIcon className='h-6' />
          </div>
          {
            classes.map((clas, index)=>{
                return (
                    <Accordion key={index} style={{background: '#F2F3F5', margin: 0}}>
                        <AccordionSummary
                        expandIcon={<ExpandMore />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        >
                        <Box style={{width: '93%'}}>
                            <Typography>{clas.name}</Typography>
                        </Box>
                        <Box>
                            <Typography>{getFinished(clas)}/{clas.contents.length}</Typography>
                        </Box>
                        
                        
                        </AccordionSummary>
                        <AccordionDetails style={{background: 'white', padding: 0, overflow: 'hidden'}}>
                        <FormGroup className="">
                        {
                            clas.contents.map((item, index)=>{
                            return (
                                <Box key={index} onClick={()=> handleChangeVideo(item, clas)} className={`flex items-center space-x-1 py-1 cursor-pointer border-b border-gray-200 ${currentContent && currentContent.id==item.id? 'bg-blue-100': ''}`}>
                                    <Checkbox onClick={()=>{
                                        // set this content to finished
                                        handleChecked(item, item.finished? 0: 1);
                                    }} checked={item.finished? true: false} />
                                    <Typography>{item.title}</Typography>
                                </Box>
                            )
                            })
                        }
                        </FormGroup>
                        </AccordionDetails>
                    </Accordion>
                )
            })
          }
          
    </div>
  )
}
