package org.example.backend.config;

import org.example.backend.chat.ChatHandler;
import org.example.backend.jwt.JwtAuthHandshakeInterceptor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {

    private final JwtAuthHandshakeInterceptor jwtAuthHandshakeInterceptor;

    public WebSocketConfig(JwtAuthHandshakeInterceptor jwtAuthHandshakeInterceptor) {
        this.jwtAuthHandshakeInterceptor = jwtAuthHandshakeInterceptor;
    }

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(chatHandler(), "/ws/chat")
                .addInterceptors(jwtAuthHandshakeInterceptor)
                .setAllowedOrigins("http://localhost:5173");
    }

    @Bean
    public WebSocketHandler chatHandler() {
        return new ChatHandler();
    }
}
