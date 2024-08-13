package cn.fan.neat.exception;

import cn.fan.neat.constant.ExceptionEnum;
import lombok.Data;

@Data
public class BizException extends RuntimeException {

    private int code;

    private String msg;

    public BizException(){
        super();
    }

    public BizException(ExceptionEnum exceptionEnum) {
        super(exceptionEnum.getMsg());
        this.code = exceptionEnum.getCode();
        this.msg = exceptionEnum.getMsg();
    }

    public BizException(ExceptionEnum exceptionEnum, Throwable cause) {
        super(exceptionEnum.getMsg(), cause);
        this.code = exceptionEnum.getCode();
        this.msg = exceptionEnum.getMsg();
    }

    public BizException(int code, String msg) {
        super(msg);
        this.code = code;
        this.msg = msg;
    }
}
