package cn.fan.neat.service.impl;

import cn.fan.neat.service.FileService;
import com.alibaba.druid.util.StringUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

@Service
@Slf4j
public class FileServiceImpl implements FileService {

    @Value("${upload.target-path}")
    private String targetPath;

    @Override
    public String upload(MultipartFile file) throws IOException {
        String originalFileName = file.getOriginalFilename();  // 文件名
        String fileSuffix = "";
        if (!StringUtils.isEmpty(originalFileName) && originalFileName.indexOf('.') > -1) {
            fileSuffix = originalFileName.substring(originalFileName.lastIndexOf("."));
        }
        String dealtFileName = UUID.randomUUID().toString().replace("-", "") + fileSuffix;
        File dest = new File(targetPath + '/' + dealtFileName);
        dest.getParentFile().mkdirs();
        file.transferTo(dest);
        return dealtFileName;
    }
}
