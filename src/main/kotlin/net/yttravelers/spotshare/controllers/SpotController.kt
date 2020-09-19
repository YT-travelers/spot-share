package net.yttravelers.spotshare.controllers

import net.yttravelers.spotshare.entities.Spot
import net.yttravelers.spotshare.services.SpotService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile

class SpotForm() {
    var name: String? = null

    var url: String? = null

    var memo: String? = null

    var file: MultipartFile? = null

    var costExpectation: Int? = null

    var requiredTimeExpectation: String? = null
}

@RestController
@RequestMapping("/spots")
@CrossOrigin
class SpotController {
    @Autowired
    lateinit var spotService: SpotService

    @GetMapping
    fun index(): List<Spot> {
        return spotService.getAll()
    }

    @PostMapping
    fun addSpot(@ModelAttribute spot: SpotForm): Spot {
        return this.spotService.addSpot(spot)
    }

    @PatchMapping("/{id}")
    fun updateSpot(@PathVariable("id") id: Int, @ModelAttribute spot: SpotForm): Spot {
        return this.spotService.updateSpot(id, spot)
    }

    @GetMapping("/{id}")
    fun findSpot(@PathVariable("id") id: Int): Spot {
        return spotService.findSpotOrException(id)
    }

    @DeleteMapping("/{id}")
    fun deleteSpot(@PathVariable("id") id: Int) {
        spotService.deleteSpot(id)
    }
}