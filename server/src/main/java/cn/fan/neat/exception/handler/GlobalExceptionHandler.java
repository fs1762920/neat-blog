package cn.fan.neat.exception.handler;

import cn.dev33.satoken.exception.NotLoginException;
import cn.fan.neat.entity.dto.BaseReturnDto;
import cn.fan.neat.constant.ExceptionEnum;
import cn.fan.neat.exception.BizException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;

@ControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    @ExceptionHandler(value = BizException.class)
    @ResponseBody
    public BaseReturnDto bizExceptionHandler(HttpServletRequest req, BizException e){
        log.warn("发生业务异常！原因是：", e);
        return BaseReturnDto.error(e.getCode(),e.getMsg());
    }

    /**
     * 处理空指针的异常
     * @param req
     * @param e
     * @return
     */
    @ExceptionHandler(value =NullPointerException.class)
    @ResponseBody
    public BaseReturnDto exceptionHandler(HttpServletRequest req, NullPointerException e){
        log.error("发生空指针异常！原因是: ", e);
        return BaseReturnDto.error(ExceptionEnum.BODY_NOT_MATCH);
    }

    /**
     * 没有token或token失效
     * @param req
     * @param e
     * @return
     */
    @ExceptionHandler(value = NotLoginException.class)
    @ResponseBody
    public BaseReturnDto exceptionHandler(HttpServletRequest req, NotLoginException e){
        log.warn("没有登录或token失效: {}", e.getMessage());
        return BaseReturnDto.error(ExceptionEnum.NO_TOKEN_CODE);
    }


    @ExceptionHandler(value = DuplicateKeyException.class)
    @ResponseBody
    public BaseReturnDto exceptionHandler(HttpServletRequest req, DuplicateKeyException e){
        log.error("数据重复！原因是: {}", e.getMessage());
        return BaseReturnDto.error(ExceptionEnum.DATA_REPEAT_CODE);
    }

    /**
     * 处理其他异常
     * @param req
     * @param e
     * @return
     */
    @ExceptionHandler(value =Exception.class)
    @ResponseBody
    public BaseReturnDto exceptionHandler(HttpServletRequest req, Exception e){
        log.error("未知异常！原因是: ", e);
        return BaseReturnDto.error(ExceptionEnum.INTERNAL_SERVER_ERROR);
    }
}
