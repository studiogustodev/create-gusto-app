float vignette (vec2 uv, float q, float o) {
	float x = clamp (1.0 - distance (uv, vec2 (0.5,0.5))*q, 0.0, 1.0);
	return (log((o - 1.0/exp (o))*x + 1.0/exp (o)) + o)/(log(o) + o);
}
#pragma glslify: export(vignette)