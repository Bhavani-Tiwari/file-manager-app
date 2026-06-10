package com.springreact.filemanager.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.springreact.filemanager.entity.FileMetadata;

public interface FileRepository extends JpaRepository<FileMetadata, Long> {
}
