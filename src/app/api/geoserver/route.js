export async function GET(req) {
  const { searchParams } = new URL(req.url);

  const geoserver = searchParams.get("geoserver") || environment.geoserver;
  const workspace = searchParams.get("workspace") || environment.workSpace;
  const user = searchParams.get("user_geoserver") || environment.user_geoserver;
  const pass = searchParams.get("pass_geoserver") || environment.pass_geoserver;

  // Eliminar estos del searchParams antes de construir la URL de WFS real
  searchParams.delete("geoserver");
  searchParams.delete("workspace");
  searchParams.delete("user_geoserver");
  searchParams.delete("pass_geoserver");

  const geoServerUrl = `${geoserver}/${workspace}/wfs`;
  const url = `${geoServerUrl}?${searchParams.toString()}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Basic ${btoa(`${user}:${pass}`)}`,
      },
    });

    if (!response.ok) {
      return new Response(JSON.stringify({ error: "Error en GeoServer" }), { status: response.status });
    }

    const contentType = response.headers.get("content-type") || "application/octet-stream";
    const contentDisposition = response.headers.get("content-disposition") || "attachment; filename=geoserver-data.csv";
    const buffer = await response.arrayBuffer();

    return new Response(Buffer.from(buffer), {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": contentDisposition,
      },
    });
  } catch (error) {
    console.error("Error en el proxy de GeoServer:", error);
    return new Response(JSON.stringify({ error: "Error al descargar archivo desde GeoServer" }), { status: 500 });
  }
}
