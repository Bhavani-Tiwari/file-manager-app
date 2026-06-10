package com.springreact.filemanager.controller;

import com.springreact.filemanager.entity.FileMetadata;
//import com.springreact.filemanager.repository.FileMetadataRepository;
import com.springreact.filemanager.repository.FileRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;
import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;

import java.nio.file.Path;
import java.nio.file.Paths;




@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/files")
public class FileController {
	
	@Autowired 
	private FileRepository fileRepository;

	@GetMapping
	public List<FileMetadata> getAllFiles() {
	    return fileRepository.findAll();
	}

	
    //private final FileMetadataRepository repository;

    @Value("${file.upload-dir}")
    private String uploadDir;

    //public FileController(FileMetadataRepository repository) {
    //    this.repository = repository; }

    @PostMapping("/upload")
    public String uploadFile(@RequestParam("file") MultipartFile file) throws IOException {

    	String uploadDir = System.getProperty("user.dir") + "/uploads/";
    	
    	 File directory = new File(uploadDir);
    	    if (!directory.exists()) {
    	        directory.mkdirs();
    	    }
    	    
    	        
        // Save file to folder
        String filePath = uploadDir + file.getOriginalFilename();
        file.transferTo(new File(filePath));

        // Save metadata to DB
        FileMetadata metadata = new FileMetadata();
        metadata.setFileName(file.getOriginalFilename());
        metadata.setFileType(file.getContentType());
        metadata.setFileSize(file.getSize());
        metadata.setFilePath(filePath);
        metadata.setUploadedAt(LocalDateTime.now());
       
        fileRepository.save(metadata);


        return "File uploaded successfully!";
           
        }
    
    @GetMapping("/download/{id}")
    public ResponseEntity<Resource> downloadFile(@PathVariable Long id) throws IOException {

        FileMetadata fileMetadata = fileRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("File not found"));

        Path path = Paths.get(fileMetadata.getFilePath());
        Resource resource = new UrlResource(path.toUri());

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"" + fileMetadata.getFileName() + "\"")
                .body(resource);
    }
    
    @DeleteMapping("/{id}")
    public String deleteFile(@PathVariable Long id) {

        FileMetadata file = fileRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("File not found"));

        File physicalFile = new File(file.getFilePath());
        if (physicalFile.exists()) {
            physicalFile.delete();
        }

        fileRepository.deleteById(id);

        return "File deleted successfully!";
    }

    

}
