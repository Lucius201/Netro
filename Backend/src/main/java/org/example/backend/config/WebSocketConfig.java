package org.example.backend.config;

import org.example.backend.chat.ChatHandler;
import org.example.backend.jwt.JwtAuthHandshakeInterceptor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {

    private final JwtAuthHandshakeInterceptor jwtAuthHandshakeInterceptor;
    private final ChatHandler chatHandler;

    public WebSocketConfig(JwtAuthHandshakeInterceptor jwtAuthHandshakeInterceptor,
                           ChatHandler chatHandler) {
        this.jwtAuthHandshakeInterceptor = jwtAuthHandshakeInterceptor;
        this.chatHandler = chatHandler;
    }

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(chatHandler, "/ws/chat")
                .addInterceptors(jwtAuthHandshakeInterceptor)
//                .setAllowedOrigins("http://localhost:5173");
                .setAllowedOriginPatterns("*");
    }
}
