---
title: Patrones de diseño
description: A guide in my new Starlight docs site.
lastUpdated: true
---

## Puente de eventos

Una aplicación puede tener interfaces. Permite que otras aplicaciones amplíen o cambien las implementaciones de una determinada parte de la lógica empresarial. Cuando se crea una nueva implementación, debemos asegurarnos de que estos eventos se generen en los momentos adecuados. Si esos eventos se publicaron en la unidad de código de implementación, es muy posible que esos eventos no se generen, sean difíciles de encontrar o lo que sea.

```csharp
codeunit 50407 "Scale Wrong" implements IScale
{
    procedure GetWeight() Result: Decimal
    begin
        //TODO: Implement Bar GetWeight
        OnAfterGetWeight(Result);
    end;

    procedure Tare()
    begin
        //TODO: Implement Bar Tare
        OnAfterTare();
    end;

    [IntegrationEvent(false, false)]
    procedure OnAfterGetWeight(var Result: Decimal)
    begin
    end;

    [IntegrationEvent(false, false)]
    procedure OnAfterTare()
    begin
    end;
}
```

Para mitigar este problema, podemos trabajar con una nueva codeunit, dedicada y aislada, con eventos publisher para poder subirlos desde diferentes lugares.

```csharp
codeunit50406 "IScale Triggers"
{
    [IntegrationEvent(false, false)]
		procedure OnAfterGetWeight(var Result:Decimal)
		begin
		end;

    [IntegrationEvent(false, false)]
		procedure OnAfterTare()
		begin
		end;
}
```

```csharp
codeunit50405 "Scale Bar"implements IScale
{
var
        IScaleTriggers:Codeunit "IScale Triggers";
        
        procedure GetWeight()Result:Decimal
        begin//TODO: Implement Bar GetWeight
		        IScaleTriggers.OnAfterGetWeight(Result);
		    end;
		    procedure Tare()
				begin//TODO: Implement Bar Tare
	        IScaleTriggers.OnAfterTare();
       end;
}
```

Esta nueva unidad de código, con eventos públicos, hace que los eventos sean accesibles desde todos los lugares, incluidas las nuevas aplicaciones que dependen de esta aplicación.

Obviamente, los eventos deben considerarse cuidadosamente: solo los eventos que tienen sentido "compartir" en todas las implementaciones, necesitan este enfoque.

## Uso de Fachada

La intención de este patrón es proporcionar una API unificada a un único subsistema o a una colección de subsistemas potencialmente complejos.

El patrón de la fachada aborda dos problemas principales:

- Con el tiempo, a medida que los sistemas crecen, tienden a volverse complejos y más difíciles de comprender. Al agregar una fachada en la parte superior del subsistema, esa complejidad se oculta y se define una API clara.
- Cualquier objeto o método que sea de acceso público, puede no recibir cambios importantes en futuras versiones sin una obsolescencia anunciada. Esto complica el mantenimiento del sistema. Al agregar una fachada, se asegura de que el subsistema sea inaccesible para los sistemas externos, lo que le permite cambiar los detalles de implementación del subsistema a voluntad.

### **¿Qué es un subsistema?**

Un subsistema es un grupo de objetos que, en conjunto, proporcionan un conjunto de capacidades. Las bibliotecas son excelentes ejemplos de estos subsistemas. En Business Central, todos los módulos de la aplicación del sistema son subsistemas.tales como:

- Azure Blob Services API
- Código de barras
- Gestión de criptografía
- Codificación
- Imagen
- RegEx
- …

```csharp
/// <summary>
/// Codeunit to extract image information.
/// </summary>
codeunit3971 Image
{
    Access = Public;var
        ImageImpl:Codeunit "Image Impl.";/// <summary>
/// Creates an image from the specified data stream.
/// </summary>
/// <param name="InStream">A Stream that contains the image data.</param>
procedure FromStream(InStream:InStream)
begin
        ImageImpl.FromStream(InStream);end;/// <summary>
/// Gets the width in pixels.
/// </summary>
/// <returns>The width in pixels.</returns>
procedure GetWidth():Integerbeginexit(ImageImpl.GetWidth());end;
}
```

La unidad de código de fachada anterior tiene algunas características:

- El acceso se establece explícitamente en Público, para subrayar que se trata de una fachada.
- Todos los métodos son públicos.
- Todos los métodos están documentados.
- Ningún método contiene ninguna lógica. Se limitan a señalar los detalles de la aplicación.
- La nomenclatura del objeto sugiere que se hará referencia a él desde el exterior.