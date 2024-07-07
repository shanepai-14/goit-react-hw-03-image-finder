import React , {useState}from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '90%',
    maxHeight: '90%',
    bgcolor: 'background.paper',
    overflow: 'hidden',
  };
const ImageGallery = ({ images }) => {
    const [open, setOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);


      const handleOpen = (image) => {
        setSelectedImage(image);
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
        setSelectedImage(null);
      };
    return (
        <>
        <ImageList sx={{ width: '100%', height: 'auto',overflow:"hidden" }} cols={6} >
        {images.map((item) => (
          <ImageListItem key={item.previewURL} onClick={() => handleOpen(item)}>
            <img
              srcSet={`${item.largeImageURL}`}
              src={`${item.previewURL}`}
              alt={item.type}
              loading="lazy"
            />
             <ImageListItemBar
              sx={{
                background:
                  'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                  'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
              }}
              title={item.tags}
              position="top"
              actionIcon={
                <IconButton
                  sx={{ color: 'white' }}
                  aria-label={`star ${item.tags}`}
                >
                  <StarBorderIcon />
                </IconButton>
              }
              actionPosition="left"
            />
          </ImageListItem>
        ))}
      </ImageList>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          {selectedImage && (
            <>
              <img
                src={selectedImage.largeImageURL}
                alt={selectedImage.tags}
                style={{ width: '100%', height: 'auto' }}
              />
              <ImageListItemBar
                title={selectedImage.tags}
                subtitle={`Views: ${selectedImage.views} | Downloads: ${selectedImage.downloads}`}
              />
            </>
          )}
        </Box>
      </Modal>
      </>
      
    )
}

export default ImageGallery