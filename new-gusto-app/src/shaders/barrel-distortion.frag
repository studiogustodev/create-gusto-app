vec2 barrelDistortion(vec2 uv, float distortion)
{
    float r = uv.x * uv.x + uv.y * uv.y;
    uv *= 1.6 + distortion * r + distortion * r * r;
    return uv;
}
#pragma glslify: export(barrelDistortion)