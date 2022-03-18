#define M_PI (3.1415926535897932384626433832795)

float scanLine (vec2 uv, float n, float t) {
	return abs(sin((uv.y + t) * M_PI * n));
}
#pragma glslify: export(scanLine)