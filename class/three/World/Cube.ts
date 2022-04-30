import * as THREE from 'three'

import WebGL from '@/class/three/WebGL'
import WebGLSub from '@/class/three/WebGLSub'
import vertexShader from '@/class/three/shaders/cube/vertex.glsl'
import fragmentShader from '@/class/three/shaders/cube/fragment.glsl'

class Cube extends WebGLSub {
	geometry!: THREE.BoxGeometry
	material!: THREE.ShaderMaterial
	mesh!: THREE.Mesh

	debugFolder: { [key: string]: any } | undefined
	colors = ['#ffffff', '#ff0000', '#00ff00', '#0000ff', '#ffff00', '#00ffff', '#ff00ff']
	params = {
		color: this.colors[0],
	}

	constructor() {
		super()

		this.setGeometry()
		this.setMaterial()
		this.setMesh()

		// Debug
		if (WebGL.debug.active) {
			this.debugFolder = WebGL.debug.gui.addFolder('cube')
		}
	}

	setGeometry() {
		this.geometry = new THREE.BoxGeometry(1)
	}

	setMaterial() {
		this.material = new THREE.ShaderMaterial({
			vertexShader: vertexShader,
			fragmentShader: fragmentShader,
			uniforms: {
				uColor: { value: new THREE.Color(this.params.color) },
			},
		})

		if (WebGL.debug.active) {
			WebGL.debug.gui.add(this.params, 'color', this.colors).onChange((value: string) => {
				this.material.uniforms.uColor.value.set(value)
			})
		}
	}

	setMesh() {
		this.mesh = new THREE.Mesh(this.geometry, this.material)
		this.mesh.rotation.x = -Math.PI * 0.5
		this.mesh.receiveShadow = true
		this.mesh.name = 'Cube'
		WebGL.scene.add(this.mesh)
	}

	update() {
		this.mesh.rotation.z += 0.01
	}

	destroy() {
		WebGL.scene.remove(this.mesh)
		this.geometry.dispose()
		this.material.dispose()
	}
}

export default Cube
