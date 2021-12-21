interface Props {
    ambientLight: {
        intensity: number;
        color: string;
    };
    directionalLight: {
        intensity: number;
        position: [number, number, number];
        castShadow: boolean;
        shadowRadius?: number;
        cameraDistance?: number;
    };
}

export const Lights = (props: Props) => {
    const { ambientLight, directionalLight } = props;

    const d = props.directionalLight.cameraDistance || 18;
    return (
        <>
            <ambientLight intensity={ambientLight.intensity} color={ambientLight.color} />
            <directionalLight
                castShadow={directionalLight.castShadow}
                position={directionalLight.position}
                intensity={directionalLight.intensity}
                shadow-radius={directionalLight.shadowRadius || 10}
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
                shadow-camera-visible={true}
                shadow-camera-far={2000}
                shadow-camera-left={-d}
                shadow-camera-right={d}
                shadow-camera-top={d}
                shadow-camera-bottom={-d}
            />
        </>
    );
};
