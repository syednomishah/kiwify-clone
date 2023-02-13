import { Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Navbar from '../components/navbar'
import ReactStars from "react-rating-stars-component";
import Attachment from '../components/attachment';
import Footer from '../components/footer';
import ClassesList from '../components/classesList';
import ReactPlayer from 'react-player'
import { modules } from '../socket';
export default function Content() {
  const [classes, setClasses] = useState([]);
  const [currentClass, setCurrentClass] = useState(null);
  const [currentContent, setCurrentContent] = useState(null);
  useEffect(()=>{
    modules(processModules);
    modules();
  },[])

  const processModules = res=>{
    setClasses(res.data);
    setCurrentClass(res.data[0]);
    setCurrentContent(res.data[0].contents[0]);
    
  }

  const handleChecked = (content, finished)=>{
    let newContent = {...content, finished};
    setCurrentContent(newContent);

    let newClass = {...currentClass};
    newClass.contents = newClass.contents.map(con=>{
      if(con.id==newContent.id) con.finished = finished;
      return con;
    })

    setCurrentClass(newClass);

    let newClasses = [...classes];
    newClasses.map(clas=>{
      if(clas.id==newClass.id){
        clas.contents = newClass.contents;
      }
    })

    setClasses(newClasses);

  }

  const handleChangeVideo = (content, module)=>{
    if(module.id!=currentClass.id){
      setCurrentClass(classes.filter(cl=> cl.id==module.id)[0])
    }
    setCurrentContent(content);
  }


  // console.log('classes: ',classes);
  // console.log('current class: ',currentClass);
  // console.log('current content: ',currentContent);

  return (
    <>
      <Navbar classes={classes} />
      <div className="flex min-h-screen h-full">
        <div className="flex-1 border-r border-gray-200">
          <div style={{height: '70vh'}} key="uniqueKey" className="bg-black text-white">
            {
              currentContent && <ReactPlayer width='100%' height='100%' controls={true}  url={currentContent.video} />
            }
            {
              !currentContent && (
                <Box className="flex justify-center h-full items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="animate-spin -ml-1 mr-3 w-24 mx-auto text-white"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25"></circle> <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" className="opacity-75"></path></svg>
                </Box>
                
              )
            }
            
          </div>
          <Box className="contentInfo">
              <div className="title flex justify-between items-center p-4 py-5 border-b border-gray-200">
                  <div>
                      <p className="text-blue-600 text-lg">{currentClass && currentClass.name}</p>
                      <p className="text-2xl text-gray-700">{currentContent && currentContent.title}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div>
                      <ReactStars
                        count={5}
                        // onChange={ratingChanged}
                        size={20}
                        color="#d2d6dc"
                        isHalf={false}
                        emptyIcon={<i className="far fa-star"></i>}
                        // halfIcon={<i className="fa fa-star-half-alt"></i>}
                        fullIcon={<i className="fa fa-star"></i>}
                        activeColor="#ffd700"
                      />
                    </div>
                    <div className="flex space-x-1">
                    
                       <button className="p-2  border border-gray-200 bg-gray-100 disabled rounded py-1 px-2 text-gray-400 font-bold cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="24px" height="24px"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                       </button>
                       <button className="p-2  border border-gray-200 bg-gray-100 disabled rounded py-1 px-2 text-gray-400 font-bold cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="24px" height="24px"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                       </button>
                    </div>
                  </div>
              </div>
              <div className="description p-8 pt-6 flex-col justify-between px-8">
                <div className="h-40">
                  <p className="text-gray-700 pt-6 mb-10">
                   { currentContent && currentContent?.description}
                  </p>
                </div>
                
                <div className="attachments">
                  <p className="text-gray-500 mb-3">Attachments</p>
                  <div className="items flex space-x-2">
                    {
                      currentContent && currentContent.attachments.length==0 && (
                        <Typography className="text-sm text-gray-500">No attachments found</Typography>
                      )
                    }
                    {
                      currentContent && currentContent.attachments.map((item, index)=>{
                        return (
                          <Attachment item={item} key={index} />
                        )
                      })
                    }
                  </div>
                </div>
              </div>
              <Footer />
          </Box>
          {/* <Footer /> */}
         
        </div>
        <div style={{width: '25%'}} className="sidebar hidden lg:block">
          <ClassesList handleChangeVideo={handleChangeVideo} handleChecked={handleChecked} currentContent={currentContent} setCurrentContent={setCurrentContent} classes={classes} />
        </div>
      </div>
    </>
  )
}
