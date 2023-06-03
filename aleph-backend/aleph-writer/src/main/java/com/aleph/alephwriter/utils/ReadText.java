package com.aleph.alephwriter.utils;

import org.springframework.core.io.ClassPathResource;
import org.springframework.http.ResponseEntity;
import org.springframework.util.FileCopyUtils;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

public class ReadText {

    public static String getLocalText(String subdiv1, String subdiv2) {
        try {
            String pathname = String.format("sample_texts/king_lear/act%s.scene%s.txt", subdiv1, subdiv2);
            ClassPathResource cpr = new ClassPathResource(pathname);
            byte[] dataArr = FileCopyUtils.copyToByteArray(cpr.getInputStream());
            String data = new String(dataArr, StandardCharsets.UTF_8);
            return data;
        } catch(IOException e) {
            e.printStackTrace();
        }
        return null;
    }

}
