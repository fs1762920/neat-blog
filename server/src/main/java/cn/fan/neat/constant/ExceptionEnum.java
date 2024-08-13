package cn.fan.neat.constant;

public enum ExceptionEnum {
    SUCCESS(200, "成功!"),
    BODY_NOT_MATCH(400, "请求的数据格式不符!"),
    AUTH_FAIL_CODE(401, "密码错误!"),
    OLD_PASS_DIFFER_CODE(406, "旧密码错误!"),
    USER_NOT_FOUND(402, "该用户不存在或已被锁定!"),
    NO_TOKEN_CODE(405, "请重新登录!"),
    DATA_REPEAT_CODE(407, "数据已存在!"),
    ILLEGAL_PARAM_ERROR(408, "非法参数输入!"),
    LOGIN_RETRY(410, "密码错误，还可重试{0}次!"),
    INTERNAL_SERVER_ERROR(500, "服务器内部错误!"),
    SERVER_BUSY(503, "服务器正忙，请稍后再试!");

    /**
     * 错误码
     */
    private final int code;

    /**
     * 错误描述
     */
    private final String msg;

    ExceptionEnum(int code, String msg) {
        this.code = code;
        this.msg = msg;
    }

    public int getCode() {
        return code;
    }

    public String getMsg() {
        return msg;
    }
}
