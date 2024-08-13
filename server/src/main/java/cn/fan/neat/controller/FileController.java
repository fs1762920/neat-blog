package cn.fan.neat.controller;

import cn.dev33.satoken.annotation.SaCheckLogin;
import cn.fan.neat.entity.dto.BaseReturnDto;
import cn.fan.neat.service.FileService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/file")
@CrossOrigin
@SaCheckLogin
public class FileController {

    private final FileService fileService;

    @Value("${upload.path-prefix}")
    private String pathPrefix;

    public FileController(FileService fileService) {
        this.fileService = fileService;
    }

    @PostMapping("/upload")
    public BaseReturnDto upload(@RequestParam("file") MultipartFile file) throws IOException {
        return BaseReturnDto.success(pathPrefix + '/' + fileService.upload(file));
    }
}
