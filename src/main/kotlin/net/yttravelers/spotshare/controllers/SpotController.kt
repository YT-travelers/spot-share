package net.yttravelers.spotshare.controllers

import net.yttravelers.spotshare.entities.Spot
import net.yttravelers.spotshare.services.SpotService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile
import java.time.LocalDateTime

class SpotForm() {
    var routeNumber: Int? = null

    var scheduleDateTime: String? = null

    var country: String? = null

    var spotName: String? = null

    var costExpectation: Int? = null

    var requiredTimeExpectation: Int? = null

    var favoritePoint: Int? = null

    var url: String? = null

    var remark: String = ""

    var file: MultipartFile? = null

    //TODO: 座標を追加
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
}